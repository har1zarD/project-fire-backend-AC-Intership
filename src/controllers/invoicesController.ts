import { RequestHandler } from 'express';
import { PrismaClient, Role, InvoiceStatus } from '@prisma/client';
import createHttpError from 'http-errors';

const prisma = new PrismaClient();

// @desc    Get Invoices
// @route   GET /api/invoices
// @access  Private
export const getInvoices: RequestHandler = async (req, res, next) => {
	try {
		const invoices = await prisma.invoice.findMany();

		return res.status(200).json(invoices);
	} catch (error) {
		next(error);
	}
};

// @desc    Get Invoices
// @route   GET /api/invoices/:invoiceId
// @access  Private
export const getInvoiceById: RequestHandler = async (req, res, next) => {
	try {
		const invoiceId = req.params.invoiceId;
		const invoice = await prisma.invoice.findUnique({
			where: {
				id: invoiceId,
			},
		});
		if (!invoice) throw createHttpError(404, 'Invoice not found.');

		return res.status(200).json(invoice);
	} catch (error) {
		next(error);
	}
};

// @desc    Create Invoice
// @route   POST /api/invoices
// @access  Private
export const createInvoice: RequestHandler = async (req, res, next) => {
	try {
		const loggedInUser = req.user;
		if (loggedInUser?.role !== Role.Admin) throw createHttpError(403, 'This user is not allowed to create invoices.');

		const { client, industry, totalHoursBilled, amountBilledBAM, invoiceStatus } = req.body;
		if (!client || !industry || !totalHoursBilled || !amountBilledBAM || !invoiceStatus)
			throw createHttpError(400, 'Missing required fields.');

		const invoice = await prisma.invoice.create({
			data: {
				client,
				industry,
				totalHoursBilled,
				amountBilledBAM,
				invoiceStatus,
			},
		});

		return res.status(201).json(invoice);
	} catch (error) {
		next(error);
	}
};

// @desc    Update Invoice
// @route   PATCH /api/invoices/:invoiceId
// @access  Private
export const updateInvoice: RequestHandler = async (req, res, next) => {
	try {
		const loggedInUser = req.user;
		if (loggedInUser?.role !== Role.Admin) throw createHttpError(403, 'This user is not allowed to update invoices.');

		const invoiceId = req.params.invoiceId;
		const invoice = await prisma.invoice.findUnique({
			where: {
				id: invoiceId,
			},
		});
		if (!invoice) throw createHttpError(404, 'Invoice not found.');

		const { client, industry, totalHoursBilled, amountBilledBAM, invoiceStatus } = req.body;

		const updatedInvoice = await prisma.invoice.update({
			where: {
				id: invoiceId,
			},
			data: {
				client,
				industry,
				totalHoursBilled,
				amountBilledBAM,
				invoiceStatus,
			},
		});

		return res.status(200).json(updatedInvoice);
	} catch (error) {
		next(error);
	}
};
// @desc    Delete Invoice
// @route   DELETE /api/invoices/:invoiceId
// @access  Private
export const deleteInvoice: RequestHandler = async (req, res, next) => {
	try {
		const loggedInUser = req.user;
		if (loggedInUser?.role !== Role.Admin) throw createHttpError(403, 'This user is not allowed to delete invoices.');

		const invoiceId = req.params.invoiceId;
		const invoice = await prisma.invoice.findUnique({
			where: {
				id: invoiceId,
			},
		});
		if (!invoice) throw createHttpError(404, 'Invoice not found.');

		await prisma.invoice.delete({
			where: {
				id: invoiceId,
			},
		});

		return res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
