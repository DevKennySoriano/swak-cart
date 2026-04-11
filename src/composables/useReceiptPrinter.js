import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

async function imageToDataUrl(src) {
	const response = await fetch(src)
	if (!response.ok) return null
	const blob = await response.blob()
	return await new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result)
		reader.onerror = reject
		reader.readAsDataURL(blob)
	})
}

async function buildReceiptPdf(items) {
	const doc = new jsPDF({ unit: 'mm', format: 'a4' })
	const pageWidth = doc.internal.pageSize.getWidth()
	const pageHeight = doc.internal.pageSize.getHeight()
	const centerX = pageWidth / 2
	const generatedAt = new Intl.DateTimeFormat('en-PH', {
		dateStyle: 'medium',
		timeStyle: 'short'
	}).format(new Date())
	const logoDataUrl = await imageToDataUrl('/images/logo.png')
	const totalAmount = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0)
	const totalItemsCount = items.reduce((sum, item) => sum + Number(item.qty || 0), 0)
	const subtotalAmount = Math.abs(totalAmount)
	const discountAmount = 0
	const vatAmount = 0
	const finalTotal = subtotalAmount - discountAmount + vatAmount
	const formatReceiptMoney = (value) => {
		const amount = Math.abs(Number(value || 0))
		return `PHP ${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
	}

	if (logoDataUrl) {
		doc.addImage(logoDataUrl, 'PNG', centerX - 10, 7, 20, 20)
	}

	doc.setTextColor(0, 0, 0)
	doc.setFont('helvetica', 'bold')
	doc.setFontSize(15)
	doc.text('SWAK-CART', centerX, 31, { align: 'center' })
	doc.setFontSize(10)
	doc.text('Grocery Budget Calculator', centerX, 36, { align: 'center' })

	doc.setTextColor(0, 0, 0)
	doc.setFont('helvetica', 'bold')
	doc.setFontSize(13)
	doc.text('Cart Receipt', centerX, 46, { align: 'center' })
	doc.setFont('helvetica', 'normal')
	doc.setFontSize(10)
	doc.text(`Generated through: ${generatedAt}`, centerX, 52, { align: 'center' })
	doc.text('Personal budget tracking copy only. Not an official receipt.', centerX, 57, { align: 'center' })

	autoTable(doc, {
		startY: 62,
		head: [['Item', 'Category', 'Qty', 'Price', 'Total']],
		body: items.map((item) => [
			item.name,
			item.category || 'Other',
			String(item.qty || 0),
			formatReceiptMoney(item.price),
			formatReceiptMoney(Number(item.price || 0) * Number(item.qty || 0))
		]),
		margin: {
			left: 14,
			right: 14
		},
		styles: {
			font: 'helvetica',
			fontSize: 9,
			cellPadding: 2.8,
			textColor: [0, 0, 0],
			lineColor: [0, 0, 0],
			lineWidth: 0.1,
			halign: 'center'
		},
		headStyles: {
			fillColor: [0, 0, 0],
			textColor: 255,
			halign: 'center',
			fontStyle: 'bold'
		},
		alternateRowStyles: {
			fillColor: [245, 245, 245]
		},
		columnStyles: {
			0: { halign: 'center' },
			1: { halign: 'center' },
			2: { halign: 'center' },
			3: { halign: 'center' },
			4: { halign: 'center' }
		}
	})

	const finalY = doc.lastAutoTable?.finalY || 62
	const summaryX = pageWidth - 14
	doc.setFont('helvetica', 'normal')
	doc.setFontSize(10)
	doc.text(`Total Items Count: ${totalItemsCount}`, summaryX, finalY + 8, { align: 'right' })
	doc.text(`Sub-total: ${formatReceiptMoney(subtotalAmount)}`, summaryX, finalY + 14, { align: 'right' })
	doc.text(`Discount: ${formatReceiptMoney(discountAmount)}`, summaryX, finalY + 20, { align: 'right' })
	doc.text(`VAT/TAX: ${formatReceiptMoney(vatAmount)}`, summaryX, finalY + 26, { align: 'right' })

	doc.setFont('helvetica', 'bold')
	doc.setFontSize(12)
	doc.text(`Total: ${formatReceiptMoney(finalTotal)}`, summaryX, finalY + 34, { align: 'right' })

	doc.setFont('helvetica', 'normal')
	doc.setFontSize(9)
	doc.setTextColor(0, 0, 0)
	doc.text('Use this record for personal expense tracking and future shopping comparison.', centerX, pageHeight - 14, {
		align: 'center'
	})

	return doc
}

function downloadReceiptPdf(doc, fileName) {
	const pdfBlob = doc.output('blob')
	const downloadUrl = URL.createObjectURL(pdfBlob)
	const anchor = document.createElement('a')
	anchor.href = downloadUrl
	anchor.download = fileName
	document.body.appendChild(anchor)
	anchor.click()
	document.body.removeChild(anchor)
	URL.revokeObjectURL(downloadUrl)
}

export function useReceiptPrinter(Swal, showToast) {
	async function printAndCompleteCart(items, onComplete) {
		if (!items.length) {
			showToast('Add items before completing the cart.', 'info')
			return
		}

		const result = await Swal.fire({
			title: 'Complete Cart?',
			text: 'This will open your receipt preview before completion.',
			icon: 'question',
			buttonsStyling: false,
			customClass: {
				popup: 'swak-swal',
				title: 'swak-swal-title',
				confirmButton: 'swak-btn swak-btn-primary',
				cancelButton: 'swak-btn swak-btn-cancel'
			},
			showCancelButton: true,
			cancelButtonText: 'Cancel',
			confirmButtonText: 'Open Preview',
			showCloseButton: false,
			reverseButtons: true
		})

		if (!result.isConfirmed) return

		const itemsSnapshot = items.map((item) => ({ ...item }))
		const doc = await buildReceiptPdf(itemsSnapshot)
		const receiptUrl = doc.output('bloburl')

		const previewResult = await Swal.fire({
			title: 'Receipt Preview',
			buttonsStyling: false,
			width: '900px',
			customClass: {
				popup: 'swak-swal receipt-swal',
				title: 'swak-swal-title',
				confirmButton: 'swak-btn swak-btn-primary',
				cancelButton: 'swak-btn swak-btn-cancel'
			},
			html: `
				<div class="receipt-preview">
					<iframe class="receipt-preview-frame" src="${receiptUrl}" title="Receipt preview"></iframe>
					<p class="receipt-preview-note">This copy is for personal tracking and future shopping comparison. It is not an official receipt.</p>
				</div>
			`,
			showCancelButton: true,
			cancelButtonText: 'Close Preview',
			confirmButtonText: 'Print & Complete',
			showCloseButton: false,
			reverseButtons: true
		})

		if (!previewResult.isConfirmed) return

		const fileStamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
		downloadReceiptPdf(doc, `swak-cart-receipt-${fileStamp}.pdf`)

		onComplete()

		await Swal.fire({
			title: 'Thank You for Using SWAK-CART',
			text: 'Your receipt has been downloaded and your cart has been completed.',
			icon: 'success',
			buttonsStyling: false,
			customClass: {
				popup: 'swak-swal',
				title: 'swak-swal-title',
				confirmButton: 'swak-btn swak-btn-primary'
			},
			confirmButtonText: 'Done',
			showCloseButton: false
		})

		showToast('Receipt downloaded successfully.', 'success')
	}

	return {
		printAndCompleteCart
	}
}
