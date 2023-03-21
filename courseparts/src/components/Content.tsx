import { Part } from '../types';

export interface ContentProps {
    parts: Part[]
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}

const PartDisplay = ({ part }: { part: Part }) => {
    switch(part.kind) {
        case 'basic':
            return (
                <p>
                    <div>
                        <b>{part.name} {part.exerciseCount}</b>
                    </div>
                    <div>
                        <i>{part.description}</i>
                    </div>
                </p>
            );
        case 'background':
            return (
                <p>
                    <div>
                        <b>{part.name} {part.exerciseCount}</b>
                    </div>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>
                        submit to: {part.backgroundMaterial}
                    </div>
                </p>
            )
        case 'group':
            return (
                <p>
                    <div>
                        <b>{part.name} {part.exerciseCount}</b>
                    </div>
                    <div>
                        project exercises {part.groupProjectCount}
                    </div>
                </p>
            )
        case 'special':
            return (
                <p>
                    <div>
                        <b>{part.name} {part.exerciseCount}</b>
                    </div>
                    <div>
                        <i>{part.description}</i>
                    </div>
                    <div>
                        required skills: {part.requirements}
                    </div>
                </p>
            )
        default:
            return assertNever(part);
    }
    
}

const Content = (props: ContentProps) => {
    return (
        <div>
            {props.parts.map(part => <PartDisplay key={part.name} part={part}/>)}
        </div>
    );
};

export default Content;