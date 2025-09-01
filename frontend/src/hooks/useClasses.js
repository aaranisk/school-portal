import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addClass, getClasses} from "../api/classes.js";


export const useClasses = () => {
    return useQuery({
        queryKey: ["classes"],
        queryFn: getClasses,
    })
};

export const useCreateClass = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addClass,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["classes"]});
        },
    });
};