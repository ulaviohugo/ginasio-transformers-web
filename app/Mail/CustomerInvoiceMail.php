<?php

namespace App\Mail;

use App\Models\Customer;
use App\Models\Sale;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CustomerInvoiceMail extends Mailable
{
	use Queueable, SerializesModels;
	public Sale $sale;
	public Customer $customer;

	/**
	 * Create a new message instance.
	 */
	public function __construct(Sale $sale, Customer $customer, public $pdf = null)
	{
		$this->sale = $sale->withoutRelations();
		$this->customer = $customer->withoutRelations();
	}

	/**
	 * Get the message envelope.
	 */
	public function envelope(): Envelope
	{
		return new Envelope(
			subject: "Factura #{$this->sale->id} - WO",
		);
	}

	/**
	 * Get the message content definition.
	 */
	public function content(): Content
	{
		return new Content(
			view: 'mails.customer-invoice',
		);
	}

	/**
	 * Get the attachments for the message.
	 *
	 * @return array<int, \Illuminate\Mail\Mailables\Attachment>
	 */
	public function attachments(): array
	{
		if (!$this->pdf) return [];
		$customerName = $this->customer->name;
		$fileName = "Factura WO-{$this->sale->id} - {$customerName}.pdf";
		return [
			Attachment::fromPath($this->pdf)
				// ->withMime('application/pdf')
				->as($fileName),
		];
	}
}
