import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg text-ink p-8 flex items-center justify-center font-mono">
          <div className="max-w-xl w-full border-4 border-ink p-8 bg-bg shadow-[8px_8px_0px_0px_rgba(20,20,20,1)]">
            <div className="flex items-center gap-4 mb-6 text-editorial">
              <AlertTriangle size={48} />
              <h1 className="text-3xl font-black uppercase tracking-tighter">System Error</h1>
            </div>
            <p className="mb-4 text-lg font-bold">The newsroom encountered a critical fault.</p>
            <div className="bg-ink text-bg p-4 mb-8 overflow-x-auto text-sm">
              <code>{this.state.error?.message || 'Unknown error occurred.'}</code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full border-2 border-ink bg-transparent text-ink font-bold uppercase py-3 hover:bg-ink hover:text-bg transition-colors"
            >
              Restart Engine
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
