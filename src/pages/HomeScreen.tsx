import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Camera, MapPin } from "lucide-react";
import { useState } from "react";
import { logoutAction } from "#/server/actions/logout";

interface HomeScreenProps {
	user: { email: string };
}

export function HomeScreen({ user }: HomeScreenProps) {
	const navigate = useNavigate();
	const [isUploaderOpen, setIsUploaderOpen] = useState(false);

	const logoutMutation = useMutation({
		mutationFn: () => logoutAction(),
		onSuccess: () => {
			navigate({ to: "/login" });
		},
	});

	// Mock data for the fixed fields as per request
	const profileData = {
		name: user.email.split("@")[0], // Use part of email as name
		handle: `@${user.email.split("@")[0]}`,
		role: "Senior Product Designer",
		company: "Webflow",
		pronouns: "He/Him",
		location: "Vancouver, Canada",
		avatarUrl: null, // null will trigger default avatar
		bannerUrl:
			"https://images.unsplash.com/photo-1579546124442-5785838d39f5?q=80&w=2070&auto=format&fit=crop",
	};

	return (
		<div className="min-h-screen bg-page flex flex-col items-center p-0 relative">
			{/* NavBar for Logout */}
			<nav className="absolute top-0 right-0 w-full flex justify-end p-6 z-10">
				<button
					type="button"
					onClick={() => logoutMutation.mutate()}
					disabled={logoutMutation.isPending}
					className="text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg font-semibold text-sm transition-all disabled:opacity-50"
				>
					{logoutMutation.isPending ? "Logging out..." : "Log out"}
				</button>
			</nav>

			{/* Banner Section */}
			<div className="w-full h-64 relative overflow-hidden">
				<img
					src={profileData.bannerUrl}
					alt="Profile Banner"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-black/10"></div>
			</div>

			{/* Profile Card Section */}
			<div className="w-full max-w-4xl px-4 -mt-20 z-20">
				<div className="bg-canvas rounded-2xl shadow-xl overflow-hidden border border-line">
					<div className="p-8 md:p-10">
						<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
							{/* Avatar & Basic Info */}
							<div className="flex flex-col md:flex-row gap-6 items-start">
								<div className="relative group">
									<div className="w-40 h-40 rounded-full border-4 border-canvas shadow-lg overflow-hidden bg-surface flex items-center justify-center text-muted">
										{profileData.avatarUrl ? (
											<img
												src={profileData.avatarUrl}
												alt={profileData.name}
												className="w-full h-full object-cover"
											/>
										) : (
											<div className="text-4xl font-bold uppercase">
												{profileData.name.charAt(0)}
											</div>
										)}
									</div>
								</div>

								<div className="flex flex-col gap-2 pt-4">
									<h1 className="text-3xl font-bold text-title">
										{profileData.name}
									</h1>
									<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body">
										<span className="font-medium">{profileData.handle}</span>
										<span className="text-muted">•</span>
										<span>{profileData.role}</span>
										<span className="font-semibold text-primary">
											at {profileData.company}
										</span>
										<span className="text-muted">•</span>
										<span className="text-muted italic">
											{profileData.pronouns}
										</span>
									</div>
									<div className="flex items-center gap-1.5 text-muted text-sm mt-1">
										<MapPin size={16} className="shrink-0" />
										<span>{profileData.location}</span>
									</div>
								</div>
							</div>

							{/* Update Button */}
							<button
								type="button"
								onClick={() => setIsUploaderOpen(true)}
								className="bg-canvas border border-line-alt hover:bg-surface text-title font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2"
							>
								<Camera size={18} />
								Update picture
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Placeholder for the Modal (Fase 2) */}
			{isUploaderOpen && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
					<div className="bg-canvas rounded-2xl w-full max-w-lg p-8 shadow-2xl relative">
						<button
							type="button"
							onClick={() => setIsUploaderOpen(false)}
							className="absolute top-4 right-4 text-muted hover:text-title p-2"
						>
							✕
						</button>
						<h2 className="text-xl font-bold mb-4">Upload image(s)</h2>
						<p className="text-body mb-6">
							Componente de upload será implementado na Etapa 2.
						</p>
						<button
							type="button"
							onClick={() => setIsUploaderOpen(false)}
							className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
						>
							Fechar
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
