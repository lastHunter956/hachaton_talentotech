"use client"
import "./Skeletons.scss"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"

const SkeletonEstructura = () => {
    const [ cantidadSkeleton ] = useState(6)

    return (
        <div className='estructura-skeleton'>
            {[...Array(cantidadSkeleton)].map((_, i) => (
                <div key={i} className="div-de-skeleton">
                    <Skeleton className="skeleto" />
                </div>
            ))}
        </div>
    )
}

export default SkeletonEstructura;