import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './UserProfile.css'
import Navbar from '../ActivityLog/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PeerReview from '../Forms/PeerReview';
import Funding from '../Forms/Funding';
import ConfirmationModal from '../ActivityLog/ConfirmationModal';
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

const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [activities, setActivities] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [selectedActivity, setSelectedActivity] = useState(null)
    const [showShare, setShowShare] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [selectedPublication, setSelectedPublication] = useState(null)

    const navigate = useNavigate()
    const submitActionsRef = useRef(null)

    const shareLink = user ? `${window.location.origin}/public/${user._id}` : ``

    const [form, setForm] = useState({
        name: '',
        workplace: '',
        headline: '',
        avatar: ''
    })

    const [openSections, setOpenSections] = useState({})
    const [activityForm, setActivityForm] = useState({})

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        const token = localStorage.getItem('token')

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        setUser(res.data.user)
        setActivities(res.data.activities)

        setForm({
            name: res.data.user.name || '',
            workplace: res.data.user.workplace || '',
            headline: res.data.user.headline || '',
            avatar: res.data.user.avatar || ''
        })
    }

    const saveProfile = async () => {
        const token = localStorage.getItem('token')

        const res = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/profile`,
            form,
            { headers: { Authorization: `Bearer ${token}` } }
        )

        setUser(res.data);
        setEditMode(false);
    }

    // upload file as avatar
    const handleAvatarUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setForm({ ...form, avatar: reader.result })
        }
        reader.readAsDataURL(file)
    }

    // opening activity from profile
    const openActivity = (activity) => {
        setSelectedActivity(activity)
    }

    // save activity when editing activity from profile
    const saveActivity = async () => {
        const token = localStorage.getItem('token')

        const payload = {
            title: activityForm.title,
            type: activityForm.type,
            description: activityForm.description,
            startDate: activityForm.startDate,
            endDate: activityForm.endDate,
            status: activityForm.status,
            pinned: activityForm.pinned,
            details: activityForm.details || {}
        }

        await axios.put(`${import.meta.env.VITE_API_URL}/api/activities/${selectedActivity._id}`,
            payload,
            {
                headers: { Authorization: `Bearer ${token}` } 
            }
        )

        await fetchProfile()
        setSelectedActivity(null)
    }

    // delete activity from profile
    const deleteActivity = async () => {
        const token = localStorage.getItem('token')
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/activities/${selectedActivity._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        
        setSelectedActivity(null)
        fetchProfile()
    }

    // pin activity to profile
    const pinActivity = async () => {
        const token = localStorage.getItem('token')
        
        const newPinnedValue = !activityForm.pinned

        await axios.put(`${import.meta.env.VITE_API_URL}/api/activities/${selectedActivity._id}`,
            { pinned: newPinnedValue },
            { headers: { Authorization: `Bearer ${token}` } }
        )

        setActivityForm(prev => ({ ...prev, pinned: newPinnedValue }))
        setSelectedActivity(prev => ({ ...prev, pinned: newPinnedValue }))
        await fetchProfile()
        //setSelectedActivity(null)
    }

    const toggleSection = (type) => {
        setOpenSections(prev => ({
            ...prev,
            [type]: !prev[type]
        }))
    }

    // group activities by type
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
        'external': 'Other activities', //
        'fellowship': 'Awards and prizes',
        'festival': 'Public engagement',
        'honoraryDegree': 'Awards and prizes',
        'hostingExternal': 'Business and community', //
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
    safeActivities.forEach(a => {
        if (!a || !a.type) return

        const typeKey = mapType[a.type] || a.type

        if (sections[typeKey]) {
            sections[typeKey].push(a)
        }
    })
    
    /*
    activities.forEach(a => {
        const typeKey = mapType[a.type] || a.type
        if (sections[typeKey]) {
            sections[typeKey].push(a)
        }
    })
    */

    const safePublications = Array.isArray(user?.publications) ? user.publications : []
    sections['Publications'] = safePublications

    if (!user) return <p>Loading...</p>

    const handleActivitySaved = async () => {
        await fetchProfile()
        setSelectedActivity(null)
    }

    const renderActivityForm = () => {
        if (!selectedActivity) return null

        const type = (selectedActivity.type || '').toLowerCase().replace(/[-_\s]/g, '')

        switch (type) {
            case 'peerreview':
                return (
                    <PeerReview
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'funding':
                return (
                    <Funding
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )
            
            case 'advisorypanel':
                return (
                    <AdvisoryPanel
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'appointment':
                return (
                    <Appointment
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'consultancy':
                return (
                    <Consultancy
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'contribution':
                return (
                    <ContributionToCommittee
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )
            
            case 'cpd':
                return (
                    <CPD
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )
            
            case 'election':
                return (
                    <ElectionToEarnedSociety
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )
            
            case 'examination':
                return (
                    <Examination
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'external':
                return (
                    <ExternalInstitution
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'fellowship':
                return (
                    <Fellowship
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'festival':
                return (
                    <Festival
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'honorarydegree':
                return (
                    <HonoraryDegree
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'hostingexternal':
                return (
                    <HostingExternal
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'lecture':
                return (
                    <Lecture
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'mediaarticle':
                return (
                    <MediaArticle
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'membershipofboard':
                return (
                    <MembershipOfBoard
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'membershipofcommittee':
                return (
                    <MembershipOfCommittee
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'membershipofcouncil':
                return (
                    <MembershipOfCouncil
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'membershipofgovernment':
                return (
                    <MembershipOfGovernment
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'membershipofexternalresearchorg':
                return (
                    <MembershipOfExternalResearchOrg
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'membershipofnetwork':
                return (
                    <MembershipOfNetwork
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'nationalhonour':
                return (
                    <NationalHonour
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'participation':
                return (
                    <ParticipationActivity
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'prizes':
                return (
                    <Prizes
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'research':
                return (
                    <ResearchAndTeaching
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'schools':
                return (
                    <SchoolsEngagement
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            case 'talksorpresentations':
                return (
                    <TalksOrPresentations
                        existingData={selectedActivity}
                        onSaved={handleActivitySaved}
                        mode='published'
                        hideButtons
                        externalSubmitRef={submitActionsRef}
                    />
                )

            default:
                return <p>No form available for this activity type.</p>
        }
    }

    const removePublication = async (publicationId) => {
        try {
            const token = localStorage.getItem("token")

            await axios.delete(`${import.meta.env.VITE_API_URL}/api/publications/${publicationId}`, {
            headers: { Authorization: `Bearer ${token}` }
            })

            setSelectedPublication(null)
            await fetchProfile()
        } catch (error) {
            console.error("Failed to remove publication:", error)
        }
    }

    return (
        <div className='profile-page'>
            <Navbar />
            <br />
            <div className='profile-body'>
                <div className='left'>
                    <div className='profile-header'>
                        <img src={form.avatar || 'https://via.placeholder.com/120'} />

                        <div>
                            {editMode ? (
                                <>
                                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
                                    <input value={form.headline} onChange={e => setForm({...form, headline: e.target.value})}/>
                                </>
                            ) : (
                                <>
                                    <h2>{user.name}</h2>
                                    <p>{user.headline}</p>
                                </>
                            )}
                            {editMode && (
                                <>
                                    <input type='file' accept='image/*' onChange={handleAvatarUpload} />

                                    {form.avatar && (
                                        <button onClick={() => setForm({ ...form, avatar: '' })}>Remove avatar</button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div className='workplace-section'>
                        <h3>Workplace</h3>
                        {editMode ? (
                            <input value={form.workplace} onChange={e => setForm({...form, workplace: e.target.value})} />

                        ) : (
                            <p>{user.workplace || 'No workplace set yet.'}</p>
                        )}
                    </div>

                    <div className='pinned-section'>
                        <h3>Pinned achievements</h3>
                        {activities.filter(a => a?.pinned).length === 0 ? (
                            <p>No pinned activities</p>
                        ) : (
                            <ul>
                                {activities
                                    .filter(a => a?.pinned)
                                    .map(a => (
                                        <li key={a._id} onClick={() => openActivity(a)}>
                                            {a.title || a.type}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>

                    <div className='profile-buttons'>
                        <button onClick={() => setShowShare(true)}>Share profile</button>
                        <button onClick={() => setEditMode(!editMode)}>{editMode ? 'Cancel' : 'Edit'}</button>
                        {editMode && <button onClick={saveProfile}>Save</button>}
                        <Link to='/dashboard'><button>Dashboard</button></Link>
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
                                        items.map(item => {
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
                                                    <strong>{isPublication ? item.title : item.title}</strong>
                                                    <p>
                                                        {isPublication
                                                            ? `${item.journal || 'Unknown journal'}${item.date ? ` • ${item.date}` : ''}`
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
                            <h2>Edit activity</h2>
                            <button onClick={() => setSelectedActivity(null)}>✕</button>
                        </div>

                        <div className='modal-body modal-body-single'>
                            <div className='modal-form-scroll'>
                                {renderActivityForm()}
                            </div>

                            <div className='profile-activity-actions'>
                                <button className='delete-button' onClick={() => setShowConfirm(true)}>Delete</button>
                                <button onClick={pinActivity}>
                                    {selectedActivity?.pinned ? 'Unpin' : '📌 Pin'}
                                </button>
                                <button onClick={() => submitActionsRef.current?.save?.()}>Save</button>
                                {/*<button onClick={() => submitActionsRef.current?.publish?.()}>Publish</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <PublicationModal
                publication={selectedPublication}
                isOpen={!!selectedPublication}
                onClose={() => setSelectedPublication(null)}
                onRemove={removePublication}
            />

            {showShare && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h3>Share your profile</h3>
                        <input value={shareLink} readOnly />
                        <button onClick={() => navigator.clipboard.writeText(shareLink)}>Copy</button>
                        <button onClick={() => setShowShare(false)}>Close</button>
                    </div>
                </div>
            )}

            {showConfirm && (
                <ConfirmationModal
                    message='Are you sure you want to delete this activity?'
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={async () => {
                        await deleteActivity();
                        setShowConfirm(false);
                    }}
                />
            )}
        </div>
    )
}

export default UserProfile