import { Toast } from "@base-ui/react/toast";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "#/lib/utils";

// Expose the manager hook and provider
export const useToastManager = Toast.useToastManager;
export const ToastProvider = Toast.Provider;

export function Toasts() {
	const { toasts, close } = Toast.useToastManager();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="fixed top-10 left-1/2 -translate-x-1/2 z-100 flex flex-col items-center gap-2 pointer-events-none">
			{toasts.map(
				(toast: {
					id: string;
					type?: string;
					title?: React.ReactNode;
					transitionStatus?: "starting" | "ending";
				}) => (
					<Toast.Root
						key={toast.id}
						toast={toast}
						className="pointer-events-auto"
					>
						<div
							className={cn(
								"flex items-center w-[342px] min-h-[32px] px-3 gap-2 border rounded-md shadow-sm transition-all duration-300",
								toast.transitionStatus === "starting"
									? "opacity-0 scale-95"
									: "",
								toast.transitionStatus === "ending" ? "opacity-0 scale-95" : "",
								toast.type === "error"
									? "bg-red-50 border-red-300 text-red-800"
									: "bg-green-50 border-green-300 text-green-800",
							)}
						>
							<div
								className={cn(
									"px-2 py-0.5 rounded text-xs font-semibold",
									toast.type === "error"
										? "bg-red-100 text-red-800"
										: "bg-green-100 text-green-800",
								)}
							>
								{toast.type === "error" ? "Error" : "Success"}
							</div>
							<div className="text-xs font-normal leading-tight flex-1">
								{toast.title ? String(toast.title) : "Sem mensagem"}
							</div>
							<button
								type="button"
								onClick={() => close(toast.id)}
								className={cn(
									"p-0.5 rounded-md hover:bg-black/5 transition-colors cursor-pointer shrink-0",
									toast.type === "error" ? "text-red-800" : "text-green-800",
								)}
							>
								<X className="w-3.5 h-3.5" />
							</button>
						</div>
					</Toast.Root>
				),
			)}
		</div>
	);
}
