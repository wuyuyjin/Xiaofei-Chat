import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneDark} from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as copy from "copy-to-clipboard";
import {useEffect, useState} from "react";

// darcula webstorm
// vscDarkPlus vscode暗色主题

type tProps = {
  textContent: string
  darkMode?: boolean; // markdown文本
}

const OmsViewMarkdown = (props: tProps) => {
  const {textContent} = props;
  const [isTrue, setIsTrue] = useState(true)

  useEffect(() => {
    isTrue===false? setTimeout(() => {
      setIsTrue(true)
    },5000):""
  }, [isTrue]);
  return (
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
        }
      }}
    >
      {textContent}
    </ReactMarkdown>
  );
};

export default OmsViewMarkdown;