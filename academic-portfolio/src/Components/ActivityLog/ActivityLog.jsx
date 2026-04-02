import React, { useState } from 'react';
import './ActivityLog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PeerReview from '../Forms/PeerReview';
import Prizes from '../Forms/Prizes';
import ParticipationActivity from '../Forms/ParticipationActivity';

const ActivityLog = ({ isOpen, onClose, onSaved }) => {
    const options = [
        {
            header: { name: 'Activity' },
            values: [
                { name: 'Consultancy', description: 'Consulting work' },
                { name: 'Examination', description: 'Examining students' },
                { name: 'External institutions', description: 'External roles' },
                { name: 'Hosting visitors', description: 'Examining students' },
                { name: 'Participation or Organisation for events', description: 'Examining students' },
                { name: 'Peer-review and editorial activity', description: 'Examining students' },
                { name: 'Talks or presentations', description: 'Examining students' }
            ]
        },
        {
            header: { name: 'Awards and prizes' },
            values: [
                { name: 'Appointment', description: 'Examining students' },
                { name: 'Election to earned ociety', description: 'Examining students' },
                { name: 'Fellowship awarded competitively', description: 'Examining students' },
                { name: 'Honorary degree', description: 'Examining students' },
                { name: 'National/International honour', description: 'Examining students' },
                { name: 'Prizes (including medals and awards)', description: 'Examining students' }
            ] 
        },
        {
            header: { name: 'Funding' },
            values: [
                { name: 'Hosting visitors', description: 'Examining students' },
            ]
        },
        {
            header: { name: 'Impact' },
            values: [
                { name: 'Hosting visitors', description: 'Examining students' },
            ]
        },
        {
            header: { name: 'Membership' },
            values: [
                { name: 'Of board', description: 'Examining students' },
                { name: 'Of committee', description: 'Examining students' },
                { name: 'Of council', description: 'Examining students' },
                { name: 'Of network', description: 'Examining students' }
            ]
        },
        {
            header: { name: 'External Academic Engagement' },
            values: [
                { name: 'Contribution to national/international committees', description: 'Examining students' },
                { name: 'Invited talks', description: 'Examining students' },
                { name: 'Membership of external research organisation', description: 'Examining students' },
                { name: 'Research and Teaching at external organisation', description: 'Examining students' }
            ]
        },
        {
            header: { name: 'Business and Community' },
            values: [
                { name: 'CPD Delivery/Organisation of Courses for Externals', description: 'Examining students' },
                { name: 'Hosting of External, Non-Academic Vistor', description: 'Examining students' },
                { name: 'Membership of Public/Government Advisory/Policy Group or Panel', description: 'Examining students' },
                { name: 'Work on Advisory Panel to Industry or Government/Non-Government Organisation', description: 'Examining students' }
            ]
        },
        {
            header: { name: 'Public Engagement and Outreach' },
            values: [
                { name: 'Festival/Exhibition', description: 'Examining students' },
                { name: 'Media Article or Participation', description: 'Examining students' },
                { name: 'Public Lecture/Debate/Seminar', description: 'Examining students' },
                { name: 'Schools Engagement', description: 'Examining students' }
            ]
        },
        
    ]

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
                (item.description || '').toLowerCase().includes(value.toLowerCase())
            );

            if (option.header.name.toLowerCase().includes(value.toLowerCase())) {
                return option
            }

            return {
                ...option,
                values: foundValues
            }
        })

        .filter(option =>
            option.values.length > 0 ||
            option.header.name.toLowerCase().includes(value.toLowerCase())
        )

        if (value.trim() !== '') {
            const expanded = {}
            filtered.forEach(option => {
                expanded[option.header.name] = true
            })
            setExpandedSections(expanded)
        }

        setVisibleOptions(filtered)
    }

    const toggleSection = (name) => {
        setExpandedSections(prev => ({
            ...prev,
            [name]: !prev[name]
        }))
    }

    return (
        <div className='overlay'>
            <div className='modal animate'>
                <div className='modal-header'>
                    <h2>Quick Add</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className='modal-body'>
                    <div className='modal-left'>
                        <input
                            type='text'
                            placeholder='Search...'
                            value={search}
                            onChange={onChange}
                            className='search-input'
                        />

                        {visibleOptions.map(option => {
                            const name = option.header.name;
                            const isOpen = expandedSections[name];

                            return (
                                <div key={name}>

                                    <div
                                        className='section-header'
                                        onClick={() => toggleSection(name)}
                                    >
                                        <span>{name}</span>
                                        {isOpen ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronRight} />}
                                    </div>

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
                            )
                        })}
                    </div>

                    <div className='modal-right'>
                        {selectedItem ? (
                            <div>
                                {selectedItem.name === 'Peer-review and editorial activity' && <PeerReview onSaved={onSaved} />}
                                {selectedItem.name === 'Participation or Organisation for events' && <ParticipationActivity onSaved={onSaved} />}
                                {selectedItem.name === 'Prizes (including medals and awards)' && <Prizes onSaved={onSaved} />}
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
    )
}

export default ActivityLog
