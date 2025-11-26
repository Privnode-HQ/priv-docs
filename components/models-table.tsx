'use client';

import { useEffect, useState } from 'react';

interface PricingItem {
  model_name: string;
  enable_groups: string[];
}

interface PricingResponse {
  data: PricingItem[];
}

export function ModelsTable({ group = 'default' }: { group?: string }) {
  const [models, setModels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [copiedModel, setCopiedModel] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://privnode.com/api/pricing')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch pricing data');
        return res.json();
      })
      .then((data: PricingResponse) => {
        const filteredModels = data.data
          .filter((item) => item.enable_groups?.includes(group))
          .map((item) => item.model_name);
        setModels(filteredModels);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [group]);

  const handleCopy = async (modelName: string) => {
    try {
      await navigator.clipboard.writeText(modelName);
      setCopiedModel(modelName);
      setTimeout(() => setCopiedModel(null), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  const displayModels = expanded ? models : models.slice(0, 5);
  const remainingCount = models.length - 5;

  return (
    <table>
      <tbody>
        {displayModels.map((modelName) => (
          <tr key={modelName}>
            <td>
              <code
                onClick={() => handleCopy(modelName)}
                style={{ cursor: 'pointer' }}
                title="点击复制"
              >
                {modelName}
              </code>
              {copiedModel === modelName && (
                <span style={{ marginLeft: '8px', fontSize: '0.875em', color: '#22c55e' }}>
                  已复制
                </span>
              )}
            </td>
          </tr>
        ))}
        {!expanded && remainingCount > 0 && (
          <tr>
            <td>
              <span
                onClick={() => setExpanded(true)}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                还有 {remainingCount} 项，点击展开...
              </span>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
