import React from 'react';
import { Link } from 'react-router-dom';

const ActionCard = ({ activities }) => {
    if (!activities.length) {
        return <p>No recent activity</p>
    }

    return (
        <div className='action-card'>
            <div>
                {activities.slice(0, 5).map(a => (
                    <div key={a._id} className="action-card">
                        <p>
                            You added a: <strong>{a.type}</strong>
                        </p>

                        <Link to="/profile">
                            View this on your profile
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActionCard