export interface RootLayout {
  title: string;
  description: string;
}

export interface AuthOverlay {
  title: string;
  content: string;
}

export interface AuthLayout extends RootLayout {
  overlay: AuthOverlay;
}
