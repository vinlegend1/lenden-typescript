import * as React from 'react';

export interface ErrorBoundaryProps {}

export interface ErrorBoundaryState {}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state = { hasError: false };

	static getDerivedStateFromError(error: ErrorBoundary) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div
					style={{
						display: 'flex',
						height: '100vh',
						justifyContent: 'center',
						alignItems: 'center',
						fontFamily: 'Cera Pro',
					}}>
					<div style={{ textAlign: 'center', width: '75%' }}>
						<h1 style={{ fontSize: '35px' }}>Something went wrong!</h1>
						<p>Please reload to continue</p>
						<div
							className='darkButton'
							onClick={() => window.location.reload()}>
							Reload
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
