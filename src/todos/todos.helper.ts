import { Todos } from "./todos.interface"

type TodosInsertQ = {
    strQuery: string
    strReplacement: string
    strReplacementValue: any[]
}

export function createTodosInsertQuery(
    data: Todos
): TodosInsertQ {
    let strQuery = `(activity_group_id, title`
    let strReplacement = `(?, ?`
    let strReplacementValue: any[] = [data.activity_group_id, data.title]

    if (data.is_active !== undefined) {
        strQuery = strQuery + `, is_active`
        strReplacement = strReplacement + `, ?`
        strReplacementValue.push(data.is_active)
    }

    if (data.priority) {
        strQuery = strQuery + `, priority`
        strReplacement = strReplacement + `, ?`
        strReplacementValue.push(data.priority)
    }

    strQuery = strQuery + `)`
    strReplacement = strReplacement + `)`

    return {strQuery,strReplacement,strReplacementValue}
}

export function isActiveFormat(data: Todos): Todos {
    data.is_active ? data.is_active = true : data.is_active = false
    return data
}
