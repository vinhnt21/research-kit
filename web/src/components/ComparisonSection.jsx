import React from 'react';
import { Scale, ArrowRight, Check } from 'lucide-react';

export default function ComparisonSection({ t }) {
  const { headers, rows } = t.comparison;

  return (
    <section className="section" id="comparison">
      <div className="container">
        <div className="section-header fade-in">
          <span className="eyebrow">
            <Scale size={14} />
            <span>{t.comparison.eyebrow}</span>
          </span>
          <h2 className="section-title">{t.comparison.heading}</h2>
          <p className="section-subtitle">{t.comparison.subtitle}</p>
        </div>

        <div className="table-scroll-hint fade-in">
          <span>Scroll horizontally to view full matrix</span>
          <ArrowRight size={13} style={{ display: 'inline', marginLeft: '4px' }} />
        </div>

        <div className="comparison-table-wrapper fade-in-scale">
          <table className="comp-table">
            <thead>
              <tr>
                <th>{headers[0]}</th>
                <th>{headers[1]}</th>
                <th>{headers[2]}</th>
                <th className="col-highlight">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={16} strokeWidth={2.5} />
                    <span>{headers[3]}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td><strong>{row.criteria}</strong></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.comp1}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.comp2}</td>
                  <td className="col-highlight">
                    {row.kit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
