import React from 'react';

const FilterPanel = ({ 
  specialties,
  selectedSpecialties,
  sortBy,
  consultationType,
  onSpecialtyChange,
  onSortChange,
  onConsultationTypeChange,
  onClearFilters
}) => {
  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3>Sort by</h3>
        <div className="filter-options">
          <label>
            <input
              type="radio"
              name="sort"
              value="price"
              checked={sortBy === 'price'}
              onChange={() => onSortChange('price')}
            />
            Price: Low-High
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="experience"
              checked={sortBy === 'experience'}
              onChange={() => onSortChange('experience')}
            />
            Experience- Most Experience first
          </label>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-header">
          <h3>Filters</h3>
          <button onClick={onClearFilters} className="clear-all">Clear All</button>
        </div>
        
        <h3>Specialities</h3>
        <div className="filter-options specialty-options">
          {specialties.map((specialty) => (
            <label key={specialty}>
              <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
              />
              {specialty}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Mode of consultation</h3>
        <div className="filter-options">
          <label>
            <input
              type="radio"
              name="consultation"
              value="video"
              checked={consultationType === 'video'}
              onChange={() => onConsultationTypeChange('video')}
            />
            Video Consultation
          </label>
          <label>
            <input
              type="radio"
              name="consultation"
              value="clinic"
              checked={consultationType === 'clinic'}
              onChange={() => onConsultationTypeChange('clinic')}
            />
            In-clinic Consultation
          </label>
          <label>
            <input
              type="radio"
              name="consultation"
              value="all"
              checked={consultationType === 'all'}
              onChange={() => onConsultationTypeChange('all')}
            />
            All
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;