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
        const rawType = draft.type || ''
        const type = rawType.toLowerCase().replace(/[-_\s]/g, '')

        if (['peerreview'].includes(type)) {
            return <PeerReview existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['funding'].includes(type)) {
            return <Funding existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['examination'].includes(type)) {
            return <Examination existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['advisorypanel'].includes(type)) {
            return <AdvisoryPanel existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['appointment'].includes(type)) {
            return <Appointment existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['consultancy'].includes(type)) {
            return <Consultancy existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['contribution'].includes(type)) {
            return <ContributionToCommittee existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['cpd'].includes(type)) {
            return <CPD existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['election'].includes(type)) {
            return <ElectionToEarnedSociety existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['prizes'].includes(type)) {
            return <Prizes existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['participation'].includes(type)) {
            return <ParticipationActivity existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['nationalhonour'].includes(type)) {
            return <NationalHonour existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['talksorpresentations'].includes(type)) {
            return <TalksOrPresentations existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['membershipofboard'].includes(type)) {
            return <MembershipOfBoard existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['membershipofcommittee'].includes(type)) {
            return <MembershipOfCommittee existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['membershipofcouncil'].includes(type)) {
            return <MembershipOfCouncil existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['membershipofnetwork'].includes(type)) {
            return <MembershipOfNetwork existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['membershipofgovernment'].includes(type)) {
            return <MembershipOfGovernment existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['membershipofexternalresearchorg'].includes(type)) {
            return <MembershipOfExternalResearchOrg existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['research'].includes(type)) {
            return <ResearchAndTeaching existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['fellowship'].includes(type)) {
            return <Fellowship existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['festival'].includes(type)) {
            return <Festival existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['mediaarticle'].includes(type)) {
            return <MediaArticle existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['schools'].includes(type)) {
            return <SchoolsEngagement existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['lecture'].includes(type)) {
            return <Lecture existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['external'].includes(type)) {
            return <ExternalInstitution existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['honorarydegree'].includes(type)) {
            return <HonoraryDegree existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }
        if (['hostingexternal'].includes(type)) {
            return <HostingExternal existingData={draft} onSaved={onSave} hideButtons mode='draft' externalSubmitRef={submitActionsRef} />
        }

        return <>No form available for this activity type.</>
    }

    const handleDelete = async () => {
        console.log(draft._id)
        const token = localStorage.getItem('token')
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/activities/${draft._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )

        await onDelete()
        onClose()
    }

    const submitActionsRef = useRef(null)

    const [showConfirm, setShowConfirm] = useState(false)

    return (
        <div className='activity-log-overlay'>
            <div className='activity-log-modal activity-log-modal-animate' style={{ maxWidth: '700px' }}>
                <div className='modal-header'>
                    <h2>Edit draft</h2>
                    <button className='modal-close-button' onClick={onClose}>✕</button>
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