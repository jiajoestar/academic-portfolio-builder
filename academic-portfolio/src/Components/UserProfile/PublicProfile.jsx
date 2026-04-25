import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserProfile.css'
import PublicNavbar from '../Home/PublicNavbar';
import Navbar from '../ActivityLog/Navbar';
import PeerReview from '../Forms/PeerReview';
import Funding from '../Forms/Funding';
import AdvisoryPanel from '../Forms/AdvisoryPanel';
import Appointment from '../Forms/Appointment';
import Consultancy from '../Forms/Consultancy';
import ContributionToCommittee from '../Forms/ContributionToCommittee';
import CPD from '../Forms/CPD';
import ElectionToEarnedSociety from '../Forms/ElectionToEarnedSociety';
import Examination from '../Forms/Examination';
import ExternalInstitution from '../Forms/ExternalInstitution';
import Fellowship from '../Forms/Fellowship';
import Festival from '../Forms/Festival';
import HonoraryDegree from '../Forms/HonoraryDegree';
import HostingExternal from '../Forms/HostingExternal';
import Lecture from '../Forms/Lecture';
import MediaArticle from '../Forms/MediaArticle';
import MembershipOfBoard from '../Forms/MembershipOfBoard';
import MembershipOfCommittee from '../Forms/MembershipOfCommitee';
import MembershipOfCouncil from '../Forms/MembershipOfCouncil';
import MembershipOfExternalResearchOrg from '../Forms/MembershipOfExternalResearchOrg';
import MembershipOfGovernment from '../Forms/MembershipOfGovernment';
import MembershipOfNetwork from '../Forms/MembershipOfNetwork';
import NationalHonour from '../Forms/NationalHonour';
import ParticipationActivity from '../Forms/ParticipationActivity';
import Prizes from '../Forms/Prizes';
import ResearchAndTeaching from '../Forms/ResearchAndTeaching';
import SchoolsEngagement from '../Forms/SchoolsEngagement';
import TalksOrPresentations from '../Forms/TalksOrPresentations';
import PublicationModal from '../ActivityLog/PublicationModal';

const PublicUserProfile = () => {
    const { id } = useParams()
    const [user, setUser] = useState(null)
    const [activities, setActivities] = useState([])
    const [selectedActivity, setSelectedActivity] = useState(null)
    const [openSections, setOpenSections] = useState({})
    const submitActionsRef = useRef(null)
    const isLoggedIn = !!localStorage.getItem('token')
    const [selectedPublication, setSelectedPublication] = useState(null)

    useEffect(() => {
        fetchPublicProfile()
    }, [id])

    const fetchPublicProfile = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}/public`)
            setUser(res.data.user)
            setActivities(res.data.activities || [])
        } catch (error) {
            console.error(error)
        }
    }

    const toggleSection = (type) => {
        setOpenSections((prev) => ({
            ...prev,
            [type]: !prev[type]
        }))
    }

    const openActivity = (activity) => {
        setSelectedActivity(activity)
    }

    const sections = {
        'Publications': [],
        'Editorial activity': [],
        'Funding': [],
        'Awards and prizes': [],
        'Memberships': [],
        'Public engagement': [],
        'Academic engagement': [],
        'Business and community': [],
        'Other activities': []
    }

    const mapType = {
        'peer_review': 'Editorial activity',
        'peer-review': 'Editorial activity',
        'peerReview': 'Editorial activity',
        'funding': 'Funding',
        'advisory-panel': 'Business and community',
        'advisory_panel': 'Business and community',
        'advisoryPanel': 'Business and community',
        'appointment': 'Awards and prizes',
        'consultancy': 'Other activities',
        'contribution': 'Academic engagement',
        'cpd': 'Business and community',
        'election': 'Awards and prizes',
        'examination': 'Academic engagement',
        'external': 'Other activities',
        'fellowship': 'Awards and prizes',
        'festival': 'Public engagement',
        'honoraryDegree': 'Awards and prizes',
        'hostingExternal': 'Business and community',
        'lecture': 'Academic engagement',
        'mediaArticle': 'Public engagement',
        'membershipOfBoard': 'Memberships',
        'membershipOfCommittee': 'Memberships',
        'membershipOfCouncil': 'Memberships',
        'membershipOfNetwork': 'Memberships',
        'membershipOfExternalResearchOrg': 'Academic engagement',
        'membershipOfGovernment': 'Business and community',
        'national-honour': 'Awards and prizes',
        'national_honour': 'Awards and prizes',
        'participation': 'Other activities',
        'prizes': 'Awards and prizes',
        'research': 'Academic engagement',
        'schools': 'Public engagement',
        'talksOrPresentations': 'Academic engagement'
    }

    const safeActivities = Array.isArray(activities) ? activities : []
    safeActivities.forEach((a) => {
        if (!a || !a.type) return
        const typeKey = mapType[a.type] || a.type
        if (sections[typeKey]) {
            sections[typeKey].push(a)
        }
    })

    const safePublications = Array.isArray(user?.publications) ? user.publications : []
    sections['Publications'] = safePublications

    const renderActivityForm = () => {
        if (!selectedActivity) return null

        const type = (selectedActivity.type || '').toLowerCase().replace(/[-_\s]/g, '')

        switch (type) {
            case 'peerreview':
                return <PeerReview existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'funding':
                return <Funding existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'advisorypanel':
                return <AdvisoryPanel existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'appointment':
                return <Appointment existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'consultancy':
                return <Consultancy existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'contribution':
                return <ContributionToCommittee existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'cpd':
                return <CPD existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'election':
                return <ElectionToEarnedSociety existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'examination':
                return <Examination existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'external':
                return <ExternalInstitution existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'fellowship':
                return <Fellowship existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'festival':
                return <Festival existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'honorarydegree':
                return <HonoraryDegree existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'hostingexternal':
                return <HostingExternal existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'lecture':
                return <Lecture existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'mediaarticle':
                return <MediaArticle existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'membershipofboard':
                return <MembershipOfBoard existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'membershipofcommittee':
                return <MembershipOfCommittee existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'membershipofcouncil':
                return <MembershipOfCouncil existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'membershipofgovernment':
                return <MembershipOfGovernment existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'membershipofexternalresearchorg':
                return <MembershipOfExternalResearchOrg existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'membershipofnetwork':
                return <MembershipOfNetwork existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'nationalhonour':
                return <NationalHonour existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'participation':
                return <ParticipationActivity existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'prizes':
                return <Prizes existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'research':
                return <ResearchAndTeaching existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'schools':
                return <SchoolsEngagement existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            case 'talksorpresentations':
                return <TalksOrPresentations existingData={selectedActivity} mode='published' hideButtons externalSubmitRef={submitActionsRef} readOnly />
            default:
                return <p>No form available for this activity type.</p>
        }
    }

    if (!user) return <p>Loading...</p>

    return (
        <div className='profile-page'>
            {isLoggedIn ? <Navbar /> : <PublicNavbar />}
            <br />

            <div className='profile-body'>
                <div className='left'>
                    <div className='profile-header'>
                        <img src={user.avatar || 'https://via.placeholder.com/120'} alt={user.name} />
                        <div>
                            <h2>{user.name}</h2>
                            <p>{user.headline || 'No headline added yet.'}</p>
                        </div>
                    </div>

                    <div className='workplace-section'>
                        <h3>Workplace</h3>
                        <p>{user.workplace || 'No workplace set yet.'}</p>
                    </div>

                    <div className='pinned-section'>
                        <h3>Pinned achievements</h3>
                        {activities.filter((a) => a?.pinned).length === 0 ? (
                            <p>No pinned activities</p>
                        ) : (
                            <ul>
                                {activities
                                    .filter((a) => a?.pinned)
                                    .map((a) => (
                                        <li key={a._id} onClick={() => openActivity(a)}>
                                            {a.title || a.type}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className='right'>
                    {Object.entries(sections).map(([type, items]) => (
                        <div key={type} className='section'>
                            <div className='section-header' onClick={() => toggleSection(type)}>
                                <h3>{type}</h3>
                                <span>{openSections[type] ? '▼' : '▶'}</span>
                            </div>

                            {openSections[type] && (
                                <div className='section-content'>
                                    {items.length === 0 ? (
                                        <p>Nothing to see here yet.</p>
                                    ) : (
                                        items.map((item) => {
                                            const isPublication = type === 'Publications'
                                            
                                            return (
                                                <div 
                                                    key={item._id || item.eid}
                                                    className='activity-item'
                                                    onClick={() => {
                                                        if (isPublication) {
                                                            setSelectedPublication(item)
                                                        } else {
                                                            openActivity(item)
                                                        }
                                                    }}
                                                >
                                                    <strong>{item.title}</strong>
                                                    <p>
                                                        {isPublication
                                                            ? `${item.journal || 'Unknown jounral'}${item.date ? ` * ${item.date}` : ''}`
                                                            : item.description}
                                                    </p>
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {selectedActivity && (
                <div className='activity-log-overlay'>
                    <div className='modal activity-edit-modal'>
                        <div className='modal-header'>
                            <h2>View activity</h2>
                            <button onClick={() => setSelectedActivity(null)}>✕</button>
                        </div>

                        <div className='modal-body modal-body-single'>
                            <div className='modal-form-scroll'>
                                {renderActivityForm()}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <PublicationModal publication={selectedPublication} isOpen={!!selectedPublication} onClose={() => setSelectedPublication(null)} />
        </div>
    )
}

export default PublicUserProfile