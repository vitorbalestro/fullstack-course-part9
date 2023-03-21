interface CoursePartBase {
    name: string,
    exerciseCount: number
}

interface CoursePartWithDescription extends CoursePartBase {
    description: string,
}

interface CoursePartBasic extends CoursePartWithDescription {
    kind: "basic"
}

interface CoursePartBackground extends CoursePartWithDescription {
    backgroundMaterial: string,
    kind: "background"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number,
    kind: "group"
}

interface CoursePartRequirements extends CoursePartWithDescription {
    requirements: string[],
    kind: "special"
}


export type Part = CoursePartBasic | CoursePartBackground | CoursePartGroup | CoursePartRequirements