import React from 'react';

import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

export default function StatusText({
  action,
  status,
  error,
}: {
  action: string;
  status: 'success' | 'failure';
  error?: string;
}) {
  return (
    <div className="mb-4">
      {status === 'success' ? (
        <div className="flex items-center gap-1">
          <FaCheckCircle className="text-green-700" />
          <p className="mb-0">{action} successful</p>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <FaExclamationCircle className="text-red-400" />
            <p className="text-red-400 text-lg mb-0">{action} error</p>
          </div>

          {error && <p className="text-gray-500 text-sm mb-0">{error}</p>}
        </div>
      )}
    </div>
  );
}
