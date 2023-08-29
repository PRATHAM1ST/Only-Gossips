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

export default function Share({ id }: { id: string }) {
	const [openPannel, setOpenPannel] = useState(false);
	const shareUrl = `https://onlygossips.pratham-chudasama.co/view/${id}`;
	return (
		<div className="relative w-12">
			{!openPannel ? (
				<ShareRoundedIcon
					className="text-5xl cursor-pointer"
					onClick={() => {
						setOpenPannel(true);
					}}
				/>
			) : (
				<div className="absolute flex flex-col gap-3 bg-white">
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
					<WhatsappShareButton
						title="Watch this Gossip"
						url={shareUrl}
					>
						<WhatsAppIcon />
					</WhatsappShareButton>
					<TwitterShareButton
						title="Watch this Gossip"
						url={shareUrl}
					>
						<TwitterIcon />
					</TwitterShareButton>
					<LinkedinShareButton
						title="Watch this Gossip"
						url={shareUrl}
					>
						<LinkedInIcon />
					</LinkedinShareButton>
					<TelegramShareButton
						title="Watch this Gossip"
						url={shareUrl}
					>
						<TelegramIcon />
					</TelegramShareButton>
					<RedditShareButton title="Watch this Gossip" url={shareUrl}>
						<RedditIcon />
					</RedditShareButton>
					<FacebookShareButton
						title="Watch this Gossip"
						url={shareUrl}
					>
						<FacebookIcon />
					</FacebookShareButton>
					<PinterestShareButton
						title="Watch this Gossip"
						url={shareUrl}
						media="https://onlygossips.pratham-chudasama.co/api/og"
					>
						<PinterestIcon />
					</PinterestShareButton>
					<EmailShareButton title="Watch this Gossip" url={shareUrl}>
						<EmailIcon />
					</EmailShareButton>
				</div>
			)}
		</div>
	);
}
