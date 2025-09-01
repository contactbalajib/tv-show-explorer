import { Injectable, signal } from '@angular/core';

export interface UiState {
  loading: boolean;
  error: string | null;
  notification: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UiStorageService {
  private readonly initialState: UiState = {
    loading: false,
    error: null,
    notification: null
  };
  
  // Signal-based state management
  private uiStateSignal = signal<UiState>(this.initialState);
  
  // Public readonly signals
  readonly uiState = this.uiStateSignal.asReadonly();
  readonly loading = this.uiStateSignal.asReadonly();
  readonly error = this.uiStateSignal.asReadonly();
  readonly notification = this.uiStateSignal.asReadonly();
  
  // Update loading state
  setLoading(loading: boolean): void {
    this.uiStateSignal.update(state => ({ ...state, loading }));
  }
  
  // Set error message
  setError(error: string | null): void {
    this.uiStateSignal.update(state => ({ ...state, error }));
  }
  
  // Clear error
  clearError(): void {
    this.setError(null);
  }
  
  // Set notification message
  setNotification(notification: string | null): void {
    this.uiStateSignal.update(state => ({ ...state, notification }));
  }
  
  // Clear notification
  clearNotification(): void {
    this.setNotification(null);
  }
  
  // Auto-clear notification after delay
  showNotification(message: string, duration: number = 3000): void {
    this.setNotification(message);
    setTimeout(() => this.clearNotification(), duration);
  }
  
  // Auto-clear error after delay
  showError(message: string, duration: number = 5000): void {
    this.setError(message);
    setTimeout(() => this.clearError(), duration);
  }
  
  // Reset UI state to initial values
  resetUiState(): void {
    this.uiStateSignal.set(this.initialState);
  }
  
  // Get current state snapshot
  getCurrentState(): UiState {
    return this.uiState();
  }
}
