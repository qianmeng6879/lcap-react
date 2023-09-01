import React, { useState } from 'react'

type propTypes = {
    confirmAction: Function
}

export default function AddFormDialog(props: propTypes) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>AddFormDialog</div>
    )
}
