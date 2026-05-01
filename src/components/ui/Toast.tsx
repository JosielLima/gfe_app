import { Toast } from "@base-ui/react/toast";
import { X } from "lucide-react";
import { cn } from "#/lib/utils";

// Expose the manager hook and provider
export const useToastManager = Toast.useToastManager;
export const ToastProvider = Toast.Provider;

export function Toasts() {
	const { toasts } = Toast.useToastManager();

	return (
		<Toast.Portal>
			<Toast.Viewport className="fixed top-10 left-1/2 -translate-x-1/2 z-100 flex flex-col items-center gap-2 outline-none pointer-events-none">
				{toasts.map(
					(toast: {
						id: string;
						type?: "success" | "error" | string;
						title?: React.ReactNode;
					}) => (
						<Toast.Root key={toast.id as string} toast={toast}>
							<Toast.Positioner toast={toast} className="pointer-events-auto">
								<Toast.Content
									className={cn(
										"flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-lg transition-all duration-300 outline-none",
										"data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
										toast.type === "error" &&
											"bg-[#FEF2F2] border-[#FEE2E2] text-[#991B1B]",
										(toast.type === "success" || !toast.type) &&
											"bg-green-50 border-green-100 text-green-800",
									)}
								>
									<div
										className={cn(
											"px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
											toast.type === "error" && "bg-[#991B1B] text-white",
											(toast.type === "success" || !toast.type) &&
												"bg-green-600 text-white",
										)}
									>
										{toast.type === "error" ? "Error" : "Success"}
									</div>
									<Toast.Title className="text-sm font-medium leading-none">
										{toast.title}
									</Toast.Title>
									<Toast.Close className="ml-2 p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer">
										<X className="w-4 h-4" />
									</Toast.Close>
								</Toast.Content>
							</Toast.Positioner>
						</Toast.Root>
					),
				)}
			</Toast.Viewport>
		</Toast.Portal>
	);
}
