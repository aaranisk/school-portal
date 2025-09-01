import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addTeacher, getTeachers} from "../api/teachers.js";


export const useTeachers = () => {
    return useQuery({
        queryKey: ["teachers"],
        queryFn: getTeachers,
    })
};

export const useCreateTeacher = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["teachers"]});
        },
    });
};