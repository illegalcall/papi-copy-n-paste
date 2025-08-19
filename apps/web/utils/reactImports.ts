/**
 * Standardized React import patterns
 * Centralizes commonly used React imports for consistency
 */

// Most common hook combination
export { useState, useCallback, useEffect } from 'react';

// Additional hooks
export { useRef, useMemo, useImperativeHandle, forwardRef } from 'react';

// Types commonly used
export type {
  Dispatch,
  SetStateAction,
  ReactNode,
  RefObject,
  MutableRefObject,
  ForwardedRef
} from 'react';