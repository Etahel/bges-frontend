export var tableMixin = {
    data: function () {
        return {
            paginationOptions: {
                enabled: true,
                setCurrentPage: 1
            },
            isLoading: false,
            apiUrl:'',
            page: {
                content: [],
                totalElements: 0
            },
            rows: [],
            totalRecords: 0,
            serverParams: {
                page: 0,
                size: 10,
                sort: [],
                columnFilters: {
                }
            }
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            var params = new URLSearchParams();
            params.append("page", this.serverParams.page);
            params.append("size", this.serverParams.size);
            for (const sort of this.serverParams.sort) {
                params.append("sort", sort.field + ',' + sort.type);
            }
            for (const [key, value] of Object.entries(this.serverParams.columnFilters)) {
                if(value.length) {
                    params.append(key.substring(key.lastIndexOf(".") + 1),value.toString());
                }
            }
            this.$api.get(this.apiUrl, {
                params: params
            }).then(response => (this.page = response.data))
        },
        updateParams(newProps) {
            this.serverParams = Object.assign({}, this.serverParams, newProps);
        },

        onPageChange(params) {
            this.updateParams({page: params.currentPage - 1});
            this.fetchData();
        },

        onPerPageChange(params) {
            this.paginationOptions = Object.assign({}, this.paginationOptions, {setCurrentPage: 1});
            this.updateParams({size: params.currentPerPage,
                page: 0});
            this.fetchData();
        },

        onSortChange(params) {
            this.updateParams({
                sort: params,
            });
            this.fetchData();
        },
        onColumnFilter(params) {
            Object.assign(this.serverParams.columnFilters, params.columnFilters);
            this.fetchData();
        },
    },

}