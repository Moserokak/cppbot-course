-- Run in the Supabase SQL editor for the C++ Bot project.
create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  completed integer[] not null default '{}',
  drafts jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;
revoke all on public.user_progress from anon, authenticated;
grant select on public.user_progress to authenticated;

create policy "Read own progress" on public.user_progress
  for select to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.merge_progress(
  p_completed integer[],
  p_drafts jsonb
) returns public.user_progress
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := (select auth.uid());
  saved public.user_progress;
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;
  insert into public.user_progress (user_id, completed, drafts)
  values (current_user_id, coalesce(p_completed, '{}'::integer[]), coalesce(p_drafts, '{}'::jsonb))
  on conflict (user_id) do update set
    completed = coalesce((
      select array_agg(distinct task_id order by task_id)
      from unnest(public.user_progress.completed || excluded.completed) as task_id
    ), '{}'::integer[]),
    drafts = public.user_progress.drafts || excluded.drafts,
    updated_at = now()
  returning * into saved;
  return saved;
end;
$$;

revoke all on function public.merge_progress(integer[], jsonb) from public, anon;
grant execute on function public.merge_progress(integer[], jsonb) to authenticated;
