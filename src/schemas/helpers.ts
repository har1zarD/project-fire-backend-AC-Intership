import { z } from 'zod';

export const generateNameSchema = (key: string, min: number, max: number) =>
	z
		.string({
			required_error: `${key} is required.`,
			invalid_type_error: `${key} must be a string.`,
		})
		.min(min, `${key} must be at least ${min} characters long.`)
		.max(max, `${key} can't be more than ${max} characters long.`);

export const generatePaginationSchema = (key: string) =>
	z
		.string({
			invalid_type_error: `${key} must be a string.`,
		})
		.superRefine((value, ctx) => {
			const parsedValue = Number(value);
			const isIntegerString = Number.isInteger(parsedValue);
			if (!isIntegerString) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `${key} must have an integer value.`,
				});
			} else if (parsedValue < 1) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `${key} must be greater than 0.`,
				});
			}
		});

const dateLike = z.union([z.string(), z.date()], {
	errorMap: () => ({ message: 'This is not a valid date.' }),
});

export const generateDateSchema = (key: string) =>
	dateLike.pipe(z.coerce.date({ errorMap: () => ({ message: 'This is not a valid date.' }) }));

export const generateDateRangeSchema = (key: string, min: Date, max: Date) =>
	dateLike.pipe(
		z.coerce
			.date({ errorMap: () => ({ message: 'This is not a valid date.' }) })
			.min(min, `${key} can't be before year ${min.getFullYear()}.`)
			.max(max, `${key} can't be after year ${max.getFullYear()}.`)
	);
