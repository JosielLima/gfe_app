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
		<div className="fixed top-10 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none">
			{toasts.map(
				(toast: { id: string; type?: string; title?: React.ReactNode }) => (
					<div
						key={toast.id}
						className={cn(
							"flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-lg transition-all duration-300 pointer-events-auto",
							toast.type === "error"
								? "bg-[#FEF2F2] border-[#FEE2E2] text-[#991B1B]"
								: "bg-green-50 border-green-100 text-green-800",
						)}
					>
						<div
							className={cn(
								"px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
								toast.type === "error"
									? "bg-[#991B1B] text-white"
									: "bg-green-600 text-white",
							)}
						>
							{toast.type === "error" ? "Error" : "Success"}
						</div>
						<div className="text-sm font-medium leading-none">
							{toast.title ? String(toast.title) : "Sem mensagem"}
						</div>
						<button
							type="button"
							onClick={() => close(toast.id)}
							className="ml-2 p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
						>
							<X className="w-4 h-4" />
						</button>
					</div>
				),
			)}
		</div>
	);
}
