'use client';

import { useEffect } from 'react';
import Intercom from '@intercom/messenger-js-sdk';

export function IntercomProvider() {
  useEffect(() => {
    Intercom({
      app_id: 'yfxwkuwi',
    });
  }, []);

  return null;
}