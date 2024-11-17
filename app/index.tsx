import 'react-native-url-polyfill/auto'
import {useState, useEffect} from 'react'
import { supabase } from '@/lib/supabase'
import Auth from './components/Auth'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Hub from "@/app/components/Hub";
import {UserProvider} from "@/app/components/UserProvider";

export default function Index() {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <UserProvider>
            <View>
                {session && session.user ? <Hub session={session}></Hub> : <Auth />}
            </View>
        </UserProvider>
    )
}
