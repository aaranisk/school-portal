import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addTeacher, getTeachers} from "../api/teachers.js";
import toast from "react-hot-toast";


export const useTeachers = () => {
    return useQuery({
        queryKey: ["teachers"],
        queryFn: getTeachers,
        onError: (err) => {
            toast.error(err.response?.data?.error || "Error creating teacher");
        },
    })
};

export const useCreateTeacher = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["teachers"]});
            toast.success("Teacher created successfully!");
            if (options.onSuccess) {
                options.onSuccess();
            }
        },
        onError: (err) => {
            toast.error(err.response?.data?.error || "Error creating teacher");
        }
    });
};