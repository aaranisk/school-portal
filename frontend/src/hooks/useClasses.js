import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addClass, getClasses} from "../api/classes.js";
import toast from "react-hot-toast";


export const useClasses = () => {
    return useQuery({
        queryKey: ["classes"],
        queryFn: getClasses,
        onError: (err) => {
            toast.error(err.response?.data?.error || "Error fetching classes");
        },
    })

};

export const useCreateClass = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addClass,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["classes"]});
            toast.success("Class created successfully!");

            if (options.onSuccess) {
                options.onSuccess();
            }
        },
        onError: (err) => {
            console.error(err);
            toast.error(err.response?.data?.error || "Error creating class");
        }
    });
};