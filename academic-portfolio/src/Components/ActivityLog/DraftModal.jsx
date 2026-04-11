import React, { useRef, useState } from 'react';
import './ActivityLog.css'
import PeerReview from '../Forms/PeerReview';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';
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

const DraftModal = ({ draft, isOpen, onClose, onSave, onPublish, onDelete }) => {
    if (!isOpen || !draft) return null

    const renderForm = () => {
        const type = draft.type?.toLowerCase()

        if (['peer_review', 'peer-review', 'peerreview'].includes(type)) {
            return <PeerReview existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['funding'].includes(type)) {
            return <Funding existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }

        return <>No form available for this activity type.</>
    }

    const handleDelete = async () => {
        console.log(draft._id)
        const token = localStorage.getItem('token')
        await axios.delete(`http://localhost:5000/api/activities/${draft._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )

        await onDelete()
        onClose()
    }

    const submitActionsRef = useRef(null)

    const [showConfirm, setShowConfirm] = useState(false)

    return (
        <div className='overlay'>
            <div className='modal animate' style={{ maxWidth: '700px' }}>
                <div className='modal-header'>
                    <h2>Edit draft</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                <div className='draft-modal-body'>
                    <div className='draft-modal-scroll'>
                        {renderForm()}
                    </div>

                    <div className='draft-modal-actions'>
                        <button className='btn-danger' onClick={() => setShowConfirm(true)}>Delete</button>
                        <button onClick={() => submitActionsRef.current?.save?.()}>Save</button>
                        <button onClick={() => submitActionsRef.current?.publish?.()}>Publish</button>
                    </div>
                </div>
            </div>

            {showConfirm && (
                <ConfirmationModal
                    message='Are you sure you want to delete this draft?'
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={async () => {
                        await handleDelete();
                        setShowConfirm(false);
                    }}
                />
            )}
        </div>
    )
}

export default DraftModal