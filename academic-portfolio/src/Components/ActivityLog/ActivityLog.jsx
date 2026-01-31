import React, { useState } from 'react'
import './ActivityLog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function ActivityLog() {

    const options= [
        {
            header: {
                name: 'Activity',
            }, 

            values: [
                {
                    name: 'activity',
                    description: 'aidawdiajwdiw',
                    tags: ['activity'],
                }
            ]
        }

    ];

    const [visibleOptions, setVisibleOptions] = useState(options);

    const onChange = (e) => {
        e.preventDefault();
        const value = e.target.value;

        console.log('value', value);

        if(value.trim().length === 0) {
            setVisibleOptions(options)
            return;
        };

        const returnedItems = []

        visibleOptions.forEach((option, index) => {
            const foundOptions = options.values.filter(item=>{
                {/* search through inputted string to find match in options array */}
                return (item.name.toLowerCase().search(value.trim().toLowerCase()) !== -1 || item.description.toLowerCase().search(value.trim().toLowerCase()) !== -1);
            });

            returnedItems[index] = {
                header:{
                    name: option.header.name,
                },
                values: foundOptions,
            };

            if (option.header.name.toLowerCase().search(value.trim().toLowerCase()) !== -1) {
                returnedItems[index] = {
                    header:{
                        name: option.header.name,
                    },
                    values: options[index].values,
                };
            }

        });

        setVisibleOptions(returnedItems)
    };

    return (
        <div className='Activity'>
            <div className='container'>
                <h1>Log an activity</h1>
                <input type='text' className='form-control' placeholder='Search...'/>
                <div>
                    {visibleOptions.map((option) => (<div key={option.header.name}>
                        <h3>{option.header.name}</h3>
                        <div>
                            {option.values.map((value) => (<div key={value.name}>
                                <ul className='list-group'>
                                    <li className='list-group-item'>
                                        <h6>{value.name}</h6>
                                        <p>{value.description}</p>
                                    </li>
                                </ul>
                            </div>))}
                        </div>
                    </div>))}
                </div>
            </div>
        </div>
    );
}

export default ActivityLog
