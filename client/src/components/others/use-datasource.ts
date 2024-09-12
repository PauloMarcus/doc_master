import { HttpRequestOptions, IDatasource, RequestBuilder, useRawDatasource } from 'open-http';
import { IConfigurator } from 'open-observable';
import { useCallback } from 'react';

type Result<T> = { count: number; results: T[] };

export type InferDatasource<R extends RequestBuilder<{ size: number; page: number; sort: any } | any, Result<any>>> =
    R extends RequestBuilder<infer TInput, infer TResult>
        ? // @ts-ignore
          IDatasource<TInput, TResult extends FilterResult<infer TOutput> ? TOutput : unknown>
        : undefined;

export function useDatasource<TInput extends { page: number }, TOutput>(
    provider: (input: TInput, options?: HttpRequestOptions) => Promise<Result<TOutput>> | Result<TOutput>,
    configure?:
        | ((configurator: IConfigurator<IDatasource<TInput & { size: number; sort: any }, TOutput>>) => void)
        | undefined
) {
    const remappedProvider = useCallback(async (input: TInput, options?: HttpRequestOptions) => {

        const remappedInput = {
            ...input,
        };

        const data = await provider(remappedInput, options);

        return { total: data.count, items: data.results };
    }, []);

    return useRawDatasource(remappedProvider, configure);
}
