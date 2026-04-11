import React, { useState, useEffect } from 'react';
import './ActivityLog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PeerReview from '../Forms/PeerReview';
import Prizes from '../Forms/Prizes';
import ParticipationActivity from '../Forms/ParticipationActivity';
import Consultancy from '../Forms/Consultancy';
import Examination from '../Forms/Examination';
import ExternalInstitution from '../Forms/ExternalInstitution';
import TalksOrPresentations from '../Forms/TalksOrPresentations';
import Appointment from '../Forms/Appointment';
import Fellowship from '../Forms/Fellowship';
import ElectionToEarnedSociety from '../Forms/ElectionToEarnedSociety';
import HonoraryDegree from '../Forms/HonoraryDegree';
import NationalHonour from '../Forms/NationalHonour';
import MembershipOfBoard from '../Forms/MembershipOfBoard';
import MembershipOfCommittee from '../Forms/MembershipOfCommitee';
import MembershipOfCouncil from '../Forms/MembershipOfCouncil';
import MembershipOfNetwork from '../Forms/MembershipOfNetwork';
import MembershipOfExternalResearchOrg from '../Forms/MembershipOfExternalResearchOrg'
import ResearchAndTeaching from '../Forms/ResearchAndTeaching';
import ContributionToCommittee from '../Forms/ContributionToCommittee';
import AdvisoryPanel from '../Forms/AdvisoryPanel';
import MembershipOfGovernment from '../Forms/MembershipOfGovernment';
import HostingExternal from '../Forms/HostingExternal';
import CPD from '../Forms/CPD';
import SchoolsEngagement from '../Forms/SchoolsEngagement';
import MediaArticle from '../Forms/MediaArticle';
import Festival from '../Forms/Festival';
import Lecture from '../Forms/Lecture';
import Funding from '../Forms/Funding';

const ActivityLog = ({ isOpen, onClose, onSaved }) => {
    const options = [
        {
            header: { name: 'Awards and Prizes' },
            values: [
                { name: 'Appointment', description: 'Receiving formal appointment' },
                { name: 'Election to earned society', description: 'Election to earned society' },
                { name: 'Fellowship awarded competitively', description: 'Awarded fellowship' },
                { name: 'Honorary degree', description: 'Receiving honorary degree' },
                { name: 'National/International honour', description: 'Receiving national/international honour' },
                { name: 'Prizes (including medals and awards)', description: 'Receiving prizes or awards' }
            ] 
        },
        {
            header: { name: 'Business and Community' },
            values: [
                { name: 'CPD delivery/organisation of courses for externals', description: 'Delivering CPD courses' },
                { name: 'Hosting of external, non-academic visitors', description: 'Hosting external visitors' },
                { name: 'Membership of public/government advisory/policy group or panel', description: 'Serving on policy panel' },
                { name: 'Work on advisory panel to industry or government/non-government organisation', description: 'Advising industry or government' }
            ]
        },
        {
            header: { name: 'External Academic Engagement' },
            values: [
                { name: 'Contribution to national/international committees', description: 'Serving on committees' },
                { name: 'Membership of external research organisation', description: 'Member of research organisation' },
                { name: 'Research and Teaching at external organisation', description: 'Teaching or researching externally' },
                { name: 'Examiner', description: 'Examining students' },
                { name: 'Talks or presentations', description: 'Delivering or attending talks' }
            ]
        },
        {
            header: { name: 'Funding' },
            values: [
                { name: 'Funding', description: 'Securing research funding' },
            ]
        },
        {
            header: { name: 'Membership' },
            values: [
                { name: 'Of board', description: 'Serving on board' },
                { name: 'Of committee', description: 'Serving on committee' },
                { name: 'Of council', description: 'Serving on council' },
                { name: 'Of network', description: 'Member of network' }
            ]
        },
        {
            header: { name: 'Other activities' },
            values: [
                { name: 'Consultancy', description: 'Consulting work' },
                { name: 'External institutions', description: 'Holding external roles' },
                { name: 'Participation or Organisation for events', description: 'Organising or attending events' },
                { name: 'Peer review and editorial activity', description: 'Reviewing or editing work' }
            ]
        },
        {
            header: { name: 'Public Engagement and Outreach' },
            values: [
                { name: 'Festival/Exhibition', description: 'Participating in festivals/exhibitions' },
                { name: 'Media article or participation', description: 'Contributing to media' },
                { name: 'Public lecture/debate/seminar', description: 'Delivering public lectures' },
                { name: 'Schools engagement', description: 'Engaging with schools' }
            ]
        }
    ]

    const [visibleOptions, setVisibleOptions] = useState(options)
    const [search, setSearch] = useState('')
    const [expandedSections, setExpandedSections] = useState({Activity: true})
    const [selectedItem, setSelectedItem] = useState(null)

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

    if (!isOpen) return null

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
                                {selectedItem.name === 'Peer review and editorial activity' && <PeerReview onSaved={onSaved} />} {/*//existingData={activity}*/}
                                {selectedItem.name === 'Participation or Organisation for events' && <ParticipationActivity onSaved={onSaved} />}
                                {selectedItem.name === 'Prizes (including medals and awards)' && <Prizes onSaved={onSaved} />}
                                {selectedItem.name === 'Consultancy' && <Consultancy onSaved={onSaved} />}
                                {selectedItem.name === 'Examiner' && <Examination onSaved={onSaved} />}
                                {selectedItem.name === 'External institutions' && <ExternalInstitution onSaved={onSaved} />}
                                
                                {selectedItem.name === 'Talks or presentations' && <TalksOrPresentations onSaved={onSaved} />}
                                {selectedItem.name === 'Appointment' && <Appointment onSaved={onSaved} />}
                                {selectedItem.name === 'Fellowship awarded competitively' && <Fellowship onSaved={onSaved} />}
                                {selectedItem.name === 'Election to earned society' && <ElectionToEarnedSociety onSaved={onSaved} />}
                                {selectedItem.name === 'Honorary degree' && <HonoraryDegree onSaved={onSaved} />}
                                {selectedItem.name === 'National/International honour' && <NationalHonour onSaved={onSaved} />}
                                {selectedItem.name === 'Of board' && <MembershipOfBoard onSaved={onSaved} />}
                                {selectedItem.name === 'Of committee' && <MembershipOfCommittee onSaved={onSaved} />}
                                {selectedItem.name === 'Of council' && <MembershipOfCouncil onSaved={onSaved} />}
                                {selectedItem.name === 'Of network' && <MembershipOfNetwork onSaved={onSaved} />}
                                {selectedItem.name === 'Research and Teaching at external organisation' && <ResearchAndTeaching onSaved={onSaved} />}
                                {selectedItem.name === 'Membership of external research organisation' && <MembershipOfExternalResearchOrg onSaved={onSaved} />}
                                {selectedItem.name === 'Contribution to national/international committees' && <ContributionToCommittee onSaved={onSaved} />}
                                
                                {selectedItem.name === 'Work on advisory panel to industry or government/non-government organisation' && <AdvisoryPanel onSaved={onSaved} />}
                                {selectedItem.name === 'Membership of public/government advisory/policy group or panel' && <MembershipOfGovernment onSaved={onSaved} />}
                                {selectedItem.name === 'CPD delivery/organisation of courses for externals' && <CPD onSaved={onSaved} />}
                                {selectedItem.name === 'Hosting of external, non-academic visitors' && <HostingExternal onSaved={onSaved} />}
                                {selectedItem.name === 'Public lecture/debate/seminar' && <Lecture onSaved={onSaved} />}
                                {selectedItem.name === 'Schools engagement' && <SchoolsEngagement onSaved={onSaved} />}
                                {selectedItem.name === 'Festival/Exhibition' && <Festival onSaved={onSaved} />}
                                {selectedItem.name === 'Media article or participation' && <MediaArticle onSaved={onSaved} />}
                                {selectedItem.name === 'Funding' && <Funding onSaved={onSaved} />}
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
