import Header from "./components/Header";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function Home() {
	return (
		<div className="container mx-auto px-4">
			<Header />
			<div className="container grid gap-3 border-2 border-black rounded-2xl px-6 py-7">
				<div className="container-header flex justify-between">
					<h1 className="gossip-title text-5xl font-bold">
						Title Of Gossip
					</h1>
					<ShareRoundedIcon className="text-5xl" />
				</div>
				<div className="gossip-createdAt font-bold text-neutral-500 text-xs">
					August 08, 2023
				</div>
				<div className="gossip-message">
					Lorem ipsum dolor sit amet consectetur. Fermentum metus
					turpis feugiat sollicitudin sit. Varius dui ac nam interdum
					convallis felis. Eget est semper et sodales justo nec
					euismod nisl neque. At et mauris turpis egestas nunc a
					commodo iaculis praesent. Euismod sagittis volutpat
					condimentum elit turpis id hendrerit lacus a. Vitae dolor
					posuere sit egestas amet massa pretium. https://cool.com
					Aliquet rhoncus rutrum at tempor lacus. Risus commodo eget
					scelerisque sit amet. Vitae vulputate odio et scelerisque
					ultricies aliquam consequat morbi in. Viverra faucibus risus
					vitae eget in aliquet amet auctor dolor. Nibh nec
					ullamcorper lacus viverra senectus. Semper libero porttitor
					scelerisque suscipit sapien justo hendrerit ut. Bibendum
					nisi arcu at fermentum. Lectus sed tempus laoreet risus non
					ultrices ut potenti justo. Ipsum urna ligula amet curabitur
					sagittis. Duis quis eu nibh pretium id ridiculus nam
					malesuada aenean. Ut felis quis quis cras. Non massa egestas
					est eleifend. Massa lorem malesuada adipiscing cras. Mattis
					sit volutpat nulla ut. Viverra vitae velit gravida semper
					diam vitae semper ullamcorper ornare. Nullam ullamcorper
					venenatis vestibulum accumsan tristique diam. Rutrum risus
					venenatis phasellus quis vitae neque faucibus. Vel mattis
					nisl eget tortor. At lacus amet vivamus facilisis leo mauris
					aliquam. Ut dolor et bibendum cras orci ornare. Neque non
					egestas sed orci quam. Posuere mauris id sem vel.
				</div>
				<div className="container-footer flex justify-between items-center mt-4">
					<button className="report border-red-500 rounded border-2 px-3 py-1 text-red-500 text-xs">
						Report
					</button>
					<div className="stats font-bold text-neutral-500 text-xs">
						200 Views {"•"} 150 Reactions
					</div>
					<div
						className="reactions flex text-2xl items-center justify-center"
						style={{
							gap: "-15rem",
						}}
					>
						<div className="top-first-reaction">😂</div>
						<div className="top-second-reaction">😂</div>
						<div className="top-third-reaction">😂</div>
						<div className="add-reaction bg-black text-white rounded-full w-8 h-8 flex justify-center items-center">
							<AddOutlinedIcon />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
