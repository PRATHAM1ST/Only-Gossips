"use client";

import { useState } from "react";
import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	PinterestShareButton,
	RedditShareButton,
	TelegramShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import RedditIcon from "@mui/icons-material/Reddit";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import CloseIcon from "@mui/icons-material/Close";

export default function Share({ id, title }: { id: string, title: string }) {
	const [openPannel, setOpenPannel] = useState(false);
	const shareUrl = `https://onlygossips.pratham-chudasama.co/view/${id}`;
	const message = `Watch this Gossip on OnlyGossips\n\n${title}\n\nTell use what you think about this gossip.\nComment on OnlyGossips\n`;
	return (
		<div
			className="relative w-12 "
			onMouseEnter={() => {
				setOpenPannel(true);
			}}
			onMouseLeave={() => {
				setOpenPannel(false);
			}}
		>
			{!openPannel ? (
				<ShareRoundedIcon
					fontSize="large"
					className="text-9xl cursor-pointer"
					onClick={() => {
						setOpenPannel(true);
					}}
				/>
			) : (
				<div className="absolute flex flex-col justify-center w-full pr-1 items-end gap-3 bg-white">
					<CloseIcon
						className="cursor-pointer"
						onClick={() => {
							setOpenPannel(false);
						}}
					/>

					<ContentCopyIcon
						className="cursor-pointer"
						onClick={() => {
							navigator.clipboard.writeText(shareUrl);
						}}
					/>
					<WhatsappShareButton title={message} url={shareUrl}>
						<WhatsAppIcon />
					</WhatsappShareButton>
					<TwitterShareButton title={message} url={shareUrl}>
						<TwitterIcon />
					</TwitterShareButton>
					<LinkedinShareButton title={message} url={shareUrl}>
						<LinkedInIcon />
					</LinkedinShareButton>
					<TelegramShareButton title={message} url={shareUrl}>
						<TelegramIcon />
					</TelegramShareButton>
					<RedditShareButton title={message} url={shareUrl}>
						<RedditIcon />
					</RedditShareButton>
					<FacebookShareButton title={message} url={shareUrl}>
						<FacebookIcon />
					</FacebookShareButton>
					<PinterestShareButton
						title={message}
						url={shareUrl}
						media="https://onlygossips.pratham-chudasama.co/api/og"
					>
						<PinterestIcon />
					</PinterestShareButton>
					<EmailShareButton 
						title={message} 
						url={shareUrl}
						subject={title + " @ OnlyGossips"}
						body={message}
					>
						<EmailIcon />
					</EmailShareButton>
				</div>
			)}
		</div>
	);
}
