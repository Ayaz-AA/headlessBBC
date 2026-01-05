"use client";

import React from "react";

type Props = {
    className?: string;
};

export default function ShortFooter({ className = "" }: Props) {
    return (
        <footer className={`bb-shortFooter ${className}`}>
            <div className="bb-shortFooter-inner">
                {/* Left */}
                <div className="bb-shortFooter-left">
                    <span className="bb-shortFooter-diamond" aria-hidden="true" />
                    <a className="bb-shortFooter-link" href="mailto:Inquiries@BestBootcamps.com">
                        Inquiries@BestBootcamps.com
                    </a>
                </div>

                {/* Center */}
                <div className="bb-shortFooter-center">© 2024 WorkForce Institute</div>

                {/* Right */}
                <div className="bb-shortFooter-right">
                    <a className="bb-shortFooter-social" href="#" aria-label="Facebook">
                        Facebook
                    </a>
                    <a className="bb-shortFooter-social" href="#" aria-label="Instagram">
                        Instagram
                    </a>
                    <a className="bb-shortFooter-social" href="#" aria-label="Twitter">
                        Twitter
                    </a>
                </div>
            </div>
        </footer>
    );
}
