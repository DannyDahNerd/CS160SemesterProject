import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link , useNavigate} from "react-router-dom";
import { useToast } from "@/hooks/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";


const SignupForm = () => {
    const { toast } = useToast()
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
    const navigate = useNavigate();

    const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount();
    const {mutateAsync: signInAccount, isPending: isSigninIn} = useSignInAccount();
    // 1. Define your form.
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name:'',
            username: '',
            email:'',
            password:'',
        },
    })
 
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignupValidation>) {
        const newUser = await createUserAccount(values);

        if(!newUser) {
            return toast({title: 'failed to create new user'})
        }

        const session = await signInAccount({
            email: values.email,
            password: values.password,
        })

        if(!session) {
            return toast({title: 'failed to sign in'})
        }

        const isLoggedIn = await checkAuthUser();

        if(isLoggedIn) {
            form.reset();
            navigate('/')
        } else {
            return toast({title:'Log In Failed'});
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img src="assets\images\logo6.png" alt="logo"/>
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
                <p className = "text-cyan-600 small-medium md:base-regular mt-2">To use UnTide, please enter your details</p>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input type="text" className="shad-input"{...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input type="text" className="shad-input"{...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" className="shad-input"{...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" className="shad-input"{...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="untide-button_primary">
                        {isCreatingAccount ? (
                            <div className="flex-center gap-2">
                                <Loader /> Loading...
                            </div>
                            ): "Sign up"}
                    </Button>
                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Already have an account?
                        <Link to="/sign-in" className="text-cyan-700 text-small-semibold ml-1"> 
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default SignupForm