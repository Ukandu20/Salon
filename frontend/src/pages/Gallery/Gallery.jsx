import React, { useState, useEffect } from 'react';
import classes from './Gallery.module.css'
import Disclaimer from '@/components/Disclaimer/Disclaimer';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons"

export default function Gallery() {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(true);
        }, 5000); // Show alert after 5000 milliseconds (5 seconds)
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <Disclaimer/>
            
            {showAlert && (
                <div className={classes.alertContainer}>
                    <Alert>
                        <RocketIcon className="h-4 w-4" />
                        <AlertTitle>Hey There!</AlertTitle>
                        <AlertDescription>
                            Like what you see? Book an appointment with us today!
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    );
}
