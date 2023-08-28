"use server";
var cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DeleteImage(imagePublicId: string) {
	try {
		await cloudinary.uploader
			.destroy(imagePublicId, {
				resource_type: "image",
				invalidate: true,
			})
			.then(function (result: { result: string }) {
				console.log({
					status: true,
					message: "Image deleted successfully",
					public_id: imagePublicId,
					result: result.result,
				});
			});

		return {
			status: true,
			message: "Image deleted successfully",
		};
	} catch (err) {
		console.log({
			status: false,
			message: "Image not deleted",
			error: err,
		});
		return {
			status: false,
			message: "Image not deleted",
		};
	}
}
