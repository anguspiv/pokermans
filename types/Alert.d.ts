interface Alert {
  open: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}
