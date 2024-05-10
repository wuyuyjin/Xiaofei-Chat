import {useRef, useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDark} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import * as copy from 'copy-to-clipboard';

type tProps = {
    textContent: string;
    darkMode?: boolean;
};

const OmsViewMarkdown = (props: tProps) => {
    const {textContent} = props;
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isTrue, setIsTrue] = useState(true)
    useEffect(() => {
        isTrue === false ? setTimeout(() => {
            setIsTrue(true)
        }, 5000) : ""

    }, [textContent]);

    // 滚动到底部
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [textContent]);

    return (
        <div>
            <ReactMarkdown
                components={{
                    code({node, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <div>
                                <div className="flex justify-between">
                                    <div></div>
                                    {
                                        isTrue ?
                                            <button className="items-end" onClick={() => (
                                                copy(String(children).replace(/\n$/, '')),
                                                    setIsTrue(false)
                                            )}>复制</button> :
                                            <button className="items-end">已复制</button>
                                    }
                                </div>
                                <SyntaxHighlighter
                                    showLineNumbers={true}
                                    language={match[1]}
                                    PreTag='div'
                                    style={atomOneDark}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {textContent}
            </ReactMarkdown>

            {/* Placeholder div to scroll to */}
            <div ref={scrollRef}/>
        </div>
    );
};

export default OmsViewMarkdown;
