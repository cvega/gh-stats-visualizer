import React, { useState } from 'react';
import Papa from 'papaparse';
import type { Repository } from '../types/repository';
import parseCsvAndCalculateStats from '../utils/parseCsv';
import type { Stats } from '../types/stats';

// Using the Repository type for CSV parsing
export type RepoData = Partial<Repository> & {
  Migration_Issue?: string;
};

// Define the props type with minimal interface
// Define the props type
interface UploaderProps {
  onStatsReady: (_stats: Stats) => void;  // underscore avoids no‑unused‑vars
}


export default function Uploader({ onStatsReady }: UploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setError(null);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!file) {
      setError('Please select a CSV file first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const parsed = Papa.parse<RepoData>(text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });

      if (parsed.errors.length > 0) {
        throw new Error(parsed.errors[0].message);
      }

      const stats = parseCsvAndCalculateStats(parsed.data);
      onStatsReady(stats);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('CSV parse error:', err);
        setError('Failed to parse and process CSV file.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#161b22',
      padding: '24px',
      borderRadius: '6px',
      border: '1px solid #30363d',
      maxWidth: '600px',
      margin: '40px auto'
    }}>
      <h2 style={{
        color: 'white',
        marginBottom: '16px',
        fontSize: '20px',
        fontWeight: 600
      }}>
        Upload GitHub Repository CSV
      </h2>

      {error && (
        <div style={{
          backgroundColor: '#301a1d',
          color: '#f5a1b1',
          padding: '12px 16px',
          borderRadius: '6px',
          marginBottom: '16px',
          border: '1px solid #c93c54',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <p style={{
        color: '#8b949e',
        marginBottom: '16px',
        fontSize: '14px'
      }}>
        Upload your GitHub repository metadata CSV file to analyze your organization's repositories.
      </p>

      <div style={{
        padding: '16px',
        border: '1px dashed #30363d',
        borderRadius: '6px',
        backgroundColor: '#0d1117',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <label style={{
          backgroundColor: '#f0f6fc',
          color: '#0d1117',
          padding: '6px 12px',
          fontSize: '14px',
          fontWeight: 500,
          borderRadius: '6px',
          border: '1px solid #30363d',
          cursor: 'pointer',
          width: 'fit-content'
        }}>
          Choose File
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
        <span style={{
          color: '#c9d1d9',
          fontSize: '14px',
          maxWidth: '70%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {file ? file.name : 'No file chosen'}
        </span>
      </div>


      <button
        onClick={handleAnalyzeClick}
        disabled={loading || !file}
        style={{
          backgroundColor: loading ? '#21262d' : '#238636',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          cursor: loading || !file ? 'not-allowed' : 'pointer',
          opacity: loading || !file ? 0.7 : 1,
          width: '100%',
          fontSize: '14px',
          fontWeight: 500,
          height: '38px'
        }}
      >
        {loading ? 'Processing...' : 'Analyze Repository Data'}
      </button>
    </div>
  );
}