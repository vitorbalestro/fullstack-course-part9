import { ContentProps } from './Content';

const Total = (props: ContentProps) => {
    return(
        <div>
            Number of exercises{" "}
            {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )
}

export default Total;