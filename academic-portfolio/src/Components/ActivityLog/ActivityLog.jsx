import React, { useState } from 'react';
import './ActivityLog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ActivityLog = ({ isOpen, onClose }) => {
    const options = [
        {
            header: { name: 'Activity' },
            values: [
                { name: 'Consultancy', description: 'Consulting work' },
                { name: 'Examination', description: 'Examining students' },
                { name: 'External institutions', description: 'External roles' },
                { name: 'Examination', description: 'Examining students' },
                { name: 'Examination', description: 'Examining students' }
            ]
        },
        {
            header: { name: 'Funding' },
            values: []
        },
        {
            header: { name: 'Impact' },
            values: []
        },
        {
            header: { name: 'Membership' },
            values: []
        }
    ];

    const [visibleOptions, setVisibleOptions] = useState(options)
    const [search, setSearch] = useState('')
    const [expandedSections, setExpandedSections] = useState({Activity: true})
    const [selectedItem, setSelectedItem] = useState(null)

    if (!isOpen) return null

    const onChange = (e) => {
        const value = e.target.value
        setSearch(value)

        if (value.trim() === '') {
            setVisibleOptions(options)
            return
        }

        const filtered = options.map((option) => {
            const foundValues = option.values.filter(item =>
                item.name.toLowerCase().includes(value.toLowerCase()) ||
                item.description.toLowerCase().includes(value.toLowerCase())
            );

            if (option.header.name.toLowerCase().includes(value.toLowerCase())) {
                return option
            }

            return {
                ...option,
                values: foundValues
            }
        })

        setVisibleOptions(filtered)
    }

    const toggleSection = (name) => {
        setExpandedSections(prev => ({
            ...prev,
            [name]: !prev[name]
        }))
    }

    return (
        <div className="overlay">
            <div className="modal animate">
                <div className="modal-header">
                    <h2>Quick Add</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className="modal-body">
                    <div className="modal-left">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={onChange}
                            className="search-input"
                        />

                        {visibleOptions.map(option => {
                            const name = option.header.name;
                            const isOpen = expandedSections[name];

                            return (
                                <div key={name}>

                                    {/* HEADER CLICKABLE */}
                                    <div
                                        className="section-header"
                                        onClick={() => toggleSection(name)}
                                    >
                                        <span>{name}</span>
                                        {isOpen ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronRight} />}
                                    </div>

                                    {/* COLLAPSIBLE CONTENT */}
                                    {isOpen && option.values.map(item => (
                                        <div
                                            key={item.name}
                                            className={`list-item ${selectedItem?.name === item.name ? 'active' : ''}`}
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            <strong>{item.name}</strong>
                                            <p>{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>

                    <div className="modal-right">
                        {selectedItem ? (
                            <div>
                                <h3>{selectedItem.name}</h3>
                                <p>{selectedItem.description}</p>
                                <button className="add-btn">Add</button>
                            </div>
                        ) : (
                            <p>
                                Select the activity, award/prize, funding, membership
                                you want to add on the left-hand side.
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ActivityLog
